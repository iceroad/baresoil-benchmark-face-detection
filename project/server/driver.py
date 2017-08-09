#!/usr/bin/env python
import base64
import fileinput
import os
import json
import sys
from face_detect import DetectFaces

print json.dumps(['ready'])
sys.stdout.flush()

for line in fileinput.input():
    proto_array = json.loads(line)
    assert isinstance(proto_array, list), 'Cannot parse JSON array from line.'
    assert len(proto_array), 'Input must be an array of size >= 1.'
    cmd = proto_array[0]

    if cmd == 'session_request':
        print json.dumps(['session_response', {
            'auth': True,
            'userData': {
                'env': os.environ['BASE_CONNECTION'],
            }
        }])

    elif cmd == 'rpc_request':
        rpc_request = proto_array[1]
        request_id = rpc_request.get('requestId', 0)
        fn_arg = rpc_request.get('argument', {})
        error = None
        result = None
        try:
            image_data = base64.b64decode(fn_arg.get('imageData'))
            result = DetectFaces(image_data)
        except e:
            error = {
                'message': str(e)
            }
        rpc_response = {
            'requestId': request_id,
        }
        if error:
            rpc_response['error'] = error
        if result:
            rpc_response['result'] = result
        print json.dumps(['rpc_response', rpc_response])

    elif cmd == 'http_request':
        http_request = proto_array[1]
        error_message = None
        status_code = 500
        content_type = 'text/plain'
        http_body = None

        files = http_request.get('files', [])
        if len(files) != 1:
            error_message = 'Please upload exactly one image.'
            status_code = 400
        else:
            if files[0].get('mimeType') != 'image/jpeg':
                error_message = 'Only JPEG files are supported.'
                status_code = 400
            else:
                try:
                    raw_image = base64.b64decode(files[0].get('data', ''))
                    http_body = base64.b64encode(
                        json.dumps(DetectFaces(raw_image)))
                    status_code = 200
                    content_type = 'application/json'
                except e:
                    status_code = 500
                    error_message = str(e)

        print json.dumps(['http_response', {
            'requestId': http_request.get('requestId', 0),
            'statusCode': status_code,
            'body': http_body,
            'headers': {
                'Content-Type': content_type,
              },
            }])

    elif cmd == 'shutdown':
        sys.exit(0)

    else:
        sys.stderr.write('Unknown command received:' + line)

    sys.stdout.flush()
