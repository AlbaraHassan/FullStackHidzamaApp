from datetime import datetime
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from .models import Appointment, Patient
from .serializers import AppointmentSerializer, PatientSerializer
from .validators import validate_age, validate_date, validate_phone
from django.core.mail import send_mail
from .middleware import ErrorHandler


class ListFreeView(APIView):
    def get(self, req):
        data = Appointment.objects.filter(**{"is_free": True})
        serializer = AppointmentSerializer(data, many=True)
        return Response(serializer.data)


class ListReservedView(APIView):
    def get(self, req):
        data = Appointment.objects.filter(**{"is_free": False})
        serializer = AppointmentSerializer(data, many=True)
        return Response(serializer.data)


class AppointmentView(APIView):

    @ErrorHandler
    def get(self, req, pk):

        dt = Appointment.objects.get(**{"id": pk})
        serializer = AppointmentSerializer(dt)
        return Response(serializer.data)

    @ErrorHandler
    def post(self, req):

        date = req.data
        validate_date(**date)
        date_object = datetime(
            year=date["year"], month=date["month"], day=date["day"])
        date["name"] = date_object.strftime("%A")
        app = Appointment.objects.create(**date)
        app.save()
        serializer = AppointmentSerializer(app)

        return Response(serializer.data)


class ReserveView(APIView):
    authentication_classes = ()

    @ErrorHandler
    def post(self, req, pk):

        patient = req.data
        reason = patient["reason"]
        del patient["reason"]
        validate_phone(patient["phone_number"])

        if Patient.objects.filter(name=patient["name"], phone_number=patient["phone_number"]).exists():

            p = Patient.objects.get(
                **{"name": patient["name"], "phone_number": patient["phone_number"]})
                
            p["anemia"] = patient.get("anemia", False)
            p["blood_sugar"] = patient.get("blood_sugar", False)
            p["kidney_problems"] = patient.get("kidney_problems", False)
            p["liver_problems"] = patient.get("liver_problems", False)
            p["thyroid_problems"] = patient.get("thyroid_problems", False)
            p["heart_problems"] = patient.get("heart_problems", False)
            p["other_problems"] = patient.get("other_problems", False)
            p["height"] = patient["height"]
            p["weight"] = patient["weight"]

            date = Appointment.objects.get(**{"id": pk})

            if date["is_free"] == False:
                raise Exception("Appointment is not free !!!")

            date["is_free"] = False
            date["reason"] = reason
            date["patient"] = p
            p.save()
            date.save()

            serializer = PatientSerializer(p)
            date = datetime(date["year"], date["month"],
                            date["day"], date["hour"], date["minute"])

            send_mail(
                f'New Reservation by {serializer.data["name"]}',
                f'Name: {serializer.data["name"]}\nDate: {date.date()}\nTime:{date.time()}\nAge: {serializer.data["age"]}\nPhone Number: {serializer.data["phone_number"]}\n\nTHE PATIENT HAD AN APPOINTMENT IN THE PAST',
                "hidzamamail@gmail.com",
                ['hidzamamail@gmail.com'],
                fail_silently=False,
            )

            return Response(serializer.data)

        p = Patient.objects.create(**patient)

        date = Appointment.objects.get(**{"id": pk})

        if date["is_free"] == False:
            raise Exception("Appointment is not free !!!")

        date["is_free"] = False
        date["reason"] = reason
        date["patient"] = p

        p.save()
        date.save()

        serializer = PatientSerializer(p)
        date = datetime(date["year"], date["month"],
                        date["day"], date["hour"], date["minute"])
        send_mail(
            f'New Reservation by {serializer.data["name"]}',
            f'Name: {serializer.data["name"]}\nDate: {date}\nTime:{date.time()}\nAge: {serializer.data["age"]}\nPhone Number: {serializer.data["phone_number"]}',
            'hidzamamail@gmail.com',
            ['hidzamamail@gmail.com'],
            fail_silently=False,
        )

        return Response(serializer.data)


