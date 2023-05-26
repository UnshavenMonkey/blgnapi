from rest_framework import viewsets
from rest_framework import filters

class AbstractViewSet(viewsets.ModelViewSet):
    ordering_fields = ['updated', 'created']
    ordering = ['-updated']