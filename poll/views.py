from django.http import HttpResponse
from django.template import loader
from .models import Question, Choice
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import qSerializer, cSerializer

# Create your views here.
def home(request):
    template = loader.get_template("home.html")
    return HttpResponse(template.render())

@api_view(["GET"])
def getData(request):

    data = {}
    tmpArray = []

    questions = Question.objects.all()
    for question in questions:
        q = qSerializer(question).data
        q["id"] = question.id
        tmpArray2 = []
        choices = question.choice_set.all()
        for choice in choices:
            c = cSerializer(choice).data
            c["id"] = choice.id
            tmpArray2.append(c)
        q["choices"] = tmpArray2
        tmpArray.append(q)
    data["info"] = tmpArray

    return Response(data)

@api_view(["POST"])
def submitData(request):
    for key in request.POST.keys():
        q = Question.objects.get(id=int(key))
        q.total_participant = q.total_participant + 1
        c = q.choice_set.get(id=int(request.POST[key]))
        c.votes = c.votes + 1
        q.save()
        c.save()
        # print(c.votes)
    return Response(request.POST)