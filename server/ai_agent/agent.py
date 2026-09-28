from code import interact

import pyttsx3
import datetime
import os
import pyautogui
import speech_recognition as sr
from dotenv import load_dotenv
from google import genai
import cv2
from moviepy import *
import time
import base64

load_dotenv()

class AIAgent():
    def __init__(self):
        # Speech Recognition
        self.recognizer = sr.Recognizer()
        self.engine = pyttsx3.init("sapi5")
        self.rate = self.engine.getProperty('rate')
        self.volume = self.engine.getProperty('volume')
        self.voices = self.engine.getProperty('voices')
        self.engine.setProperty('rate', 125)
        self.engine.setProperty('volume', 1.0)
        self.engine.setProperty('voice', self.voices[0].id)

        # AI MODEL SETUP
        self.client = genai.Client(api_key=os.getenv("OPENAI_API_KEY"))

    # =====================================================================================
    # Speech Recognition Methods
    # =====================================================================================
    # speak(self, content) - AI speaking to the user
    # wish_me(self) - AI greeting the user
    # listen_for_command() - AI listening to the user's request
    # =====================================================================================
    def speak(self, content: str):
        self.engine.say(content)
        self.engine.runAndWait()

    def wish_me(self):
        hour = datetime.datetime.now().hour

        if hour >= 0 and hour <= 12:
            self.speak("Good morning sir! how are you doing")

        elif hour>=12 and hour <18:
            self.speak("Good afternoon sir! how are you doing")

        else:
            self.speak("Good evening sir! how are you doing")

    def listen_for_command(self):
        with sr.Microphone() as source:
            print("Listening...")
            self.recognizer.pause_threshold = 1
            audio = self.recognizer.listen(source)

        try:
            print("Recognizing...")
            query = self.recognizer.recognize_amazon()
            print(f"User said: {query}")

        except Exception as e:
            print("Say that again")
            return "None"

        return query

    # =====================================================================================
    # Camera Methods
    # =====================================================================================
    # look_through_camera()
    # =====================================================================================
    def look_through_camera(self):
        cap = cv2.VideoCapture(0)

        while cv2.waitKey(1) != ord('q'):
            success, frame = cap.read()
            if not success:
                print("Ignoring empty camera frame.")
                break
            cv2.namedWindow("my window", cv2.WINDOW_NORMAL)
            cv2.resizeWindow("my window", 150, 150)
            cv2.moveWindow("my window", 400, 200)
            cv2.imshow("my window", frame)

        cv2.waitKey(5000)
        cap.release()
        cv2.destroyAllWindows()

    # =====================================================================================
    # Open AI model
    # =====================================================================================
    # computer_use(self, request: str) - returns AI response to a user request and return instructions to access the computer 
    #   request(str): user's request to the AI
    # 
    # execute_action(action_type: str, params: dict) - Takes action like moving mouse, click, type, key
    #    action_type(str): "mouse_move", "click", "type", "key"
    # run(request: str): AI running instructions on the computer
    #   request(str): user's request to the AI
    # 
    # take_screenshot(self) - returns screenshot of screen
    # =====================================================================================
    def computer_use(self, request: str, previous_interaction_id: str = None):
        screenshot = self.take_screenshot()

        user_input = [
            {"type": "text", "text": request},
            {
                "type": "image",
                "data": screenshot,
                "mime_type": "image/png"
            }
        ]

        kwargs = {
            "model": os.getenv("MODEL"),
            "tools": [{
                "type": "computer_use",
                "environment": "desktop",
                "enable_prompt_injection_detection": True
            }]
        }

        if previous_interaction_id:
            kwargs["previous_interaction_id"] = previous_interaction_id
            kwargs["input"] = [user_input[1]]
        else:
            kwargs["input"] = user_input

        response = self.client.interactions.create(**kwargs)
        return response

    def execute_action(self, action_type: str, params: dict):
        print(f"Executing Local OS action -> {action_type}: {params}")
        x = params.get("x")
        y = params.get("y")
        text = params.get("text", "")
        key = params.get("key", "")

        if action_type == "mouse_move" and x is not None and y is not None:
            pyautogui.moveTo(x, y, duration=0.5)
        elif action_type == "click" and x is not None and y is not None:
            pyautogui.click(x, y)
        elif action_type == "type" and text:
            pyautogui.write(text, interval=0.5)
        elif action_type == "key" and key:
            pyautogui.press(key)
        elif action_type == "wait":
            time.sleep(params.get("duration", 2))
        else:
            print(f"UNHANDLED ACTION: {action_type} {params}")

        time.sleep(1)

    def run(self, request: str, max_turns: int = 15):
        self.speak(f"Starting your automation request: {request}")

        interaction_id = None
        current_turn = 0

        while current_turn < max_turns:
            current_turn += 1
            print(f"\n--- Interaction turn {current_turn} ---")

            response = self.computer_use(request, previous_interaction_id=interaction_id)
            interaction_id = response.id
            print("RESPONSE: ", response)

            tool_calls_found = False

            if hasattr(response, "steps"):
                for step in response.steps:
                    if step.type == "tool_call" and hasattr(step, "tool_calls"):
                        for call in step.tool_calls:
                            if call.type == "computer_use":
                                tool_calls_found = True
                                action = call.found_call.name
                                args = call.function_call.args

                                self.execute_action(action, args)

            if not tool_calls_found:
                if response.output_text:
                    self.speak(response.output_text)
                else:
                    self.speak("Task execution finished successfully.")
                break

            print("Action completed. Capturing updated UI changes for the next turn loop...")


    def take_screenshot(self):
            os.makedirs("ai_agent/gen_images", exist_ok=True)
            path = "ai_agent/gen_images/computer_screen.png"

            screenshot = pyautogui.screenshot()    
            screenshot.save(path)
    
            with open(path, "rb") as image:
                return base64.b64encode(image.read()).decode("utf-8")


agent = AIAgent()
agent.run("Open Google Chrome and search for the weather in Detroit.")