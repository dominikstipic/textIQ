import sys

import spacy
import nltk
from nltk.corpus import stopwords

nlp = spacy.load("en_core_web_sm")

def remove_stopswords(text):
    nltk_sw  = set(stopwords.words('english'))
    spacy_sw = nlp.Defaults.stop_words
    sws = nltk_sw.union(spacy_sw)
    words = [w for w in text.split() if w not in sws]
    return " ".join(words)
    
def to_lower(text):
    return text.lower()


def noun_phrases(text):
    pass

def verbs(text):
    pass

def named_entities(text):
    pass

def preprocess(text):
    text = to_lower(text)
    return text


if __name__ == "__main__":

        args = sys.argv
        print(args)
        # if len(args) > 0:
        #     path = args[0]
        #     with open(path, "r") as fp:
        #         for line in fp:
        #             print(line)
        #             line = preprocess(line)
        #             print()
        #             print(line)
    