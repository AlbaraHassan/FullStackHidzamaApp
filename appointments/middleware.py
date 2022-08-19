from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_226_IM_USED
from functools import wraps
from django.core.exceptions import ValidationError


def ErrorHandler(fun):
    @wraps(fun)
    def inner_fun(*args, **kwargs):
        try:
            x = fun(*args,**kwargs)
            return x
        except Exception as e:

            if(fun.__name__ == "save"):
                if "duplicate key value" in e.args[0]:
                    raise ValidationError("Phone number is used!")

                raise ValidationError(e.args[0])

                

            if "duplicate key value" in e.args[0]:
                return Response({"msg":"Phone number is used!"}, status=HTTP_226_IM_USED)

            return Response({"msg": e.args[0]},status=HTTP_400_BAD_REQUEST)

    return inner_fun