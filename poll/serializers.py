from rest_framework import serializers
from .models import Question, Choice

class qSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ["q_text", "total_participant"]

class cSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Choice
        fields = ["c_text", "votes", "pVote"]