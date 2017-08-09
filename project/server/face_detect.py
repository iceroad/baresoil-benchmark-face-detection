#!/usr/bin/env python
import base64
import face_recognition
import json
import scipy.misc
import sys
import time
from io import BytesIO
from PIL import Image, ImageDraw


def DetectFaces(raw_image_buffer, thumb_dim=960):
    start_time = time.time() * 1000
    img_stream = BytesIO()
    img_stream.write(raw_image_buffer)
    img_stream.seek(0)

    # Convert image buffer into a PIL image
    pil_image = Image.open(img_stream)
    w, h = pil_image.size
    r = (w * 1.0) / (h * 1.0)
    if w > thumb_dim or h > thumb_dim:
        if w > thumb_dim:
            w = thumb_dim
            h = int(w / r)
        else:
            h = thumb_dim
            w = int(h * r)
        pil_image = pil_image.resize((w, h))
    min_dim_frac = min((w, h)) * 1.0 / thumb_dim
    line_width = max(1, int(4 * min_dim_frac))

    # Run face_recognition
    nd_image = scipy.misc.fromimage(pil_image)
    face_list = face_recognition.face_landmarks(nd_image)

    # Trace out each face's features out on a copy of the thumbnailed image.
    draw = ImageDraw.Draw(pil_image)
    faces = []
    for face_landmarks in face_list:
        # Print the location of each facial feature in this image
        facial_features = [
            'chin',
            'left_eyebrow',
            'right_eyebrow',
            'nose_bridge',
            'nose_tip',
            'left_eye',
            'right_eye',
            'top_lip',
            'bottom_lip'
        ]

        bbox = [w, h, 0, 0]  # x, y, w, h

        for facial_feature in facial_features:
            draw.line(
                face_landmarks[facial_feature],
                width=line_width,
                fill='red')

            min_x = min([pair[0] for pair in face_landmarks[facial_feature]])
            min_y = min([pair[1] for pair in face_landmarks[facial_feature]])
            max_x = max([pair[0] for pair in face_landmarks[facial_feature]])
            max_y = max([pair[1] for pair in face_landmarks[facial_feature]])

            bbox[0] = min([min_x, bbox[0]])
            bbox[1] = min([min_y, bbox[1]])
            bbox[2] = max([max_x, bbox[2]])
            bbox[3] = max([max_y, bbox[3]])

        # Save face features and bounding box
        faces.append({
            'bounds': {
                'top': bbox[0],
                'left': bbox[1],
                'width': bbox[2] - bbox[0],
                'height': bbox[3] - bbox[1],
            },
            'features': face_landmarks,
        })

        # Draw bounding box for face
        (x0, y0, x1, y1) = bbox
        draw.line((x0, y0, x0, y1), width=line_width, fill='yellow')
        draw.line((x0, y1, x1, y1), width=line_width, fill='yellow')
        draw.line((x1, y1, x1, y0), width=line_width, fill='yellow')
        draw.line((x0, y0, x1, y0), width=line_width, fill='yellow')

    # Save as JPEG to a buffer.
    output_img_stream = BytesIO()
    pil_image.save(output_img_stream, format='jpeg', quality=45)
    raw_output_image = output_img_stream.getvalue()

    return {
        'metadata': {
            'walltimeMs': int((time.time() * 1000) - start_time),
        },
        'faces': faces,
        'preview': (
            'data:image/jpeg;base64,' + base64.b64encode(raw_output_image)),
    }


if __name__ == '__main__':
    assert sys.argv[1], 'Usage: face_detect.py <path to image>'
    raw_image_buffer = open(sys.argv[1], 'rb').read()
    print json.dumps(DetectFaces(raw_image_buffer))
