import joblib
import sys
from transliterate import translit

def textClass(text, modelsPath):

    sgd = joblib.load(modelsPath + 'svg_model.pkl')
    knn = joblib.load(modelsPath + 'knn_model.pkl')
        
    knnPred = ''
    sgvPred = ''

    if knn:   
        if (text == ''):
            print('Empty text!')
        else:
            predicted_text = knn.predict([text])
            knnPred = predicted_text[0]
    else:
        print('KNN model not found!')

    if sgd:
        if (text == ''):
            print('Empty text!')

        else:
            predicted_text = sgd.predict([text])
            sgvPred = predicted_text[0]

    else:
        print('SVG not found!')
        
    if knnPred == 0: knnPred = 'normal'
    if knnPred == 1: knnPred = 'suicide'
    if knnPred == 3: knnPred = 'extremism'

    if sgvPred == 0: sgvPred = 'normal'
    if sgvPred == 1: sgvPred = 'suicide'
    if sgvPred == 3: sgvPred = 'extremism'

    return({
        'knn':knnPred,
        'sgv':sgvPred
    })

text = sys.argv[1]
if(sys.argv[3] == 'image'):
    text = text.replace(r'\r', ' ')
    text = text.replace(r'\n', ' ')
    text = translit(text, "ru")
    print(textClass(text, sys.argv[2]))
else:
    print(textClass(sys.argv[1], sys.argv[2]))
