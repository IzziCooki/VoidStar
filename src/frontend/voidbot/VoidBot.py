import chatterbot
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer

# Create object of ChatBot class with Logic Adapter
bot = ChatBot(
    'Buddy',  
    logic_adapters=['chatterbot.logic.BestMatch','chatterbot.logic.TimeLogicAdapter'],
)

corpus_trainer = ChatterBotCorpusTrainer(bot)
corpus_trainer.train("chatterbot.corpus.english")


while (True):
    user_input = input()
    if (user_input == 'quit'):
        break
    response = bot.get_response(user_input)
    print (response)
