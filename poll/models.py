from django.db import models

# Create your models here.
class Question(models.Model):
    q_text = models.CharField(max_length = 200)
    total_participant = models.IntegerField(default = 0)

    def __str__(self):
        return self.q_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    c_text = models.CharField(max_length = 200)
    votes = models.IntegerField(default = 0)

    def pVote(self):
        if self.votes != 0:
            return round(((self.votes*100)/self.question.total_participant), 2)
        else:
            return 0
        
    def __str__(self):
        return self.c_text