# import the necessary packages
# from keras.preprocessing.image import img_to_array
from keras.preprocessing import image
from keras.models import load_model
import io
import numpy as np
import cv2
import tensorflow as tf
import flask
from flask import request, jsonify, Flask, url_for
from PIL import Image
import base64
from flask_ngrok import run_with_ngrok


app = Flask(__name__)
run_with_ngrok(app)  # Start ngrok when app is run

@app.route("/")
def my_index():
    return flask.render_template("index.html")

def get_model():
    global model
    global graph
    print(" * MODEL LOADED ! ")


def preprocess(frame):
    # resize the frame and convert it to grayscale
    frame = cv2.resize (np.array(frame), (0, 0), fx=1.0, fy=1.0)  # imutils.resize()
    gray = cv2.cvtColor (frame, cv2.COLOR_BGR2GRAY)

    # load the face detector cascade, emotion detection CNN
    detector = cv2.CascadeClassifier ("haarcascade_frontalface_default.xml")

    # detect faces in the input frame
    rects = detector.detectMultiScale (gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)

    # ensure at least one face was found before continuing
    if len (rects) > 0:
        # determine the largest face area
        rect = sorted (rects, reverse=True,
                        key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))[0]
        (fX, fY, fW, fH) = rect

        # extract the face ROI from the image, then pre-process it for the network
        roi = gray[fY:fY + fH, fX:fX + fW]
        roi = cv2.resize (roi, (48, 48))
        roi = roi.astype ("float") / 255.0
        roi = tf.keras.utils.img_to_array(roi)
        roi = np.expand_dims (roi, axis=0)
        return roi

print(" LOADING KERAS MODEL . . .")


@app.route("/", methods=["GET", "POST", "PATCH", "DELETE"])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image=preprocess(image)
    graph = tf.Graph()
    with graph.as_default():
        # make a prediction on the ROI, then lookup the class label
        model = load_model("./checkpoints/epoch_60.hdf5")
        prediction = model.predict(processed_image).tolist()

    response = {
        'prediction':{
            'angry': round(prediction[0][0] * 100, 2),
            'scared': round(prediction[0][1] * 100, 2),
            'happy': round(prediction[0][2] * 100, 2),
            'sad': round(prediction[0][3] * 100, 2),
            'surprised': round(prediction[0][4] * 100, 2),
            'neutral': round(prediction[0][5] * 100, 2)
        }
    }
    print(response)
    return jsonify(response)


if __name__ == '__main__':
    app.run()