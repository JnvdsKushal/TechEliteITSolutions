from rest_framework.decorators import api_view
from rest_framework.response import Response
from academy.models import Contact

@api_view(['POST'])
def contact(request):

    name = request.data.get("name")
    email = request.data.get("email")
    message = request.data.get("message")

    Contact.objects.create(
        name=name,
        email=email,
        message=message
    )

    return Response({"message": "Contact saved successfully"})