import sys
from collections import Counter
import re

import spacy
from nltk.corpus import stopwords

nlp = spacy.load("en_core_web_sm")

def remove_stopswords(text):
    nltk_sw  = set(stopwords.words('english'))
    spacy_sw = nlp.Defaults.stop_words
    sws = nltk_sw.union(spacy_sw)
    words = [w for w in text.split() if w not in sws]
    return " ".join(words)
    
def remove_symbols(text):
    regex = r"[^a-zA-Z]"
    words = [re.sub(regex, "", w) for w in text.split()]
    text = " ".join(words)
    return text

def to_lower(text):
    return text.lower()

def most_common(text, k=10):
    words = text.split()
    c = Counter(words)
    return c.most_common(k)

def count(text):
    return len(text.split())

def spacy_stat(text):
    doc = nlp(text)
    noun_phrases = [chunk.text for chunk in doc.noun_chunks]
    noun_phrases = " ".join(noun_phrases)

    verbs = [token.lemma_ for token in doc if token.pos_ == "VERB"]
    verbs = " ".join(verbs)
    return dict(verbs=verbs, nouns=noun_phrases)

def preprocess(text):
    text = to_lower(text)
    word_count = count(text)

    text = remove_stopswords(text)
    freq = most_common(text)

    spacy_res = spacy_stat(text)
    spacy_res = {k: most_common(v) for k,v in spacy_res.items()}

    result = dict(freq=freq, count=word_count)
    result.update(spacy_res)
    return result

if __name__ == "__main__":
    args = sys.argv
    if len(args) > 1:
        path = args[0]
        with open(path, "r") as fp:
            for line in fp:
                print(line)
                line = preprocess(line)
                print(line)
    