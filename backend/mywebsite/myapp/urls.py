from django.urls import path
from .views import get_person, create_person, person_detail

urlpatterns = [
    path('person/', get_person, name='get_person' ),
    path('person/create/', create_person, name='create_person' ),
    path('person/<int:pk>', person_detail, name='person_detail')
]