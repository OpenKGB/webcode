# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.template.response import TemplateResponse


def index(request):
    return TemplateResponse(request, 'index.html', {})
