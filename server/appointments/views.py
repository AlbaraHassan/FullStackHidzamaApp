from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Appointment, Patient
from .serializers import AppointmentSerializer, PatientSerializer
from .validators import validate_age, validate_date, validate_phone
from django.core.mail import send_mail


@api_view(["GET"])
def get_all_free(req):  # GET all free appointments
    data = Appointment.objects.filter(**{"is_free": True})
    serializer = AppointmentSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_reserved(req): # GET all reserved appointments
    data = Appointment.objects.filter(**{"is_free": False})
    serializer = AppointmentSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_appointment(req):  # GET a specific appointment
    date_id = req.query_params["id"]
    dt = Appointment.objects.get(**{"id": date_id})
    serializer = AppointmentSerializer(dt)
    return Response(serializer.data)




@api_view(["POST"])
def post_date(req):  # POST new free appointment
    try:
        date = req.data
        validate_date(**date)
        date_object = datetime(
            year=date["year"], month=date["month"], day=date["day"])
        date["name"] = date_object.strftime("%A")
        app = Appointment.objects.create(**date)
        app.save()
        serializer = AppointmentSerializer(app)
        
        return Response(serializer.data)

    except Exception as e:
        return Response({"msg": e.args[0]})

@api_view(["POST"])
# POST new patient if does not already exists, and reserve appointment
def post_appointment(req):
    try:
        patient = req.data

        validate_phone(patient["phone_number"])

        date_id = req.query_params["id"]


        if Patient.objects.filter(name=patient["name"], phone_number=patient["phone_number"]).exists():



            p = Patient.objects.get(
                **{"name": patient["name"], "phone_number": patient["phone_number"]})
            p["date_of_birth"] = patient["date_of_birth"]
            date = Appointment.objects.get(**{"id": date_id})

            if date["is_free"] == False:
                raise Exception("Appointment is not free !!!")

            date["is_free"] = False
            date["patient"] = p
            p.save()
            date.save()

            serializer = PatientSerializer(p)
            date = datetime(date["year"], date["month"],
                            date["day"], date["hour"], date["minute"])
            send_mail(
            f'New Reservation by {serializer.data["name"]}',
            f'Name: {serializer.data["name"]}\nDate: {date.date()}\nTime:{date.time()}\nAge: {serializer.data["age"]}\nPhone Number: {serializer.data["phone_number"]}\n\nTHE PATIENT HAD AN APPOINTMENT IN THE PAST',
            'albara.m.hassan@gmail.com',
            ['braa3300@hotmail.com'],
            fail_silently=False,
            )

            return Response(serializer.data)

        p = Patient.objects.create(**patient)

        date = Appointment.objects.get(**{"id": date_id})

        if date["is_free"] == False:
            raise Exception("Appointment is not free !!!")

        date["is_free"] = False
        date["patient"] = p

        p.save()
        date.save()

        serializer = PatientSerializer(p)
        date = datetime(date["year"], date["month"],
                        date["day"], date["hour"], date["minute"])
        send_mail(
            f'New Reservation by {serializer.data["name"]}',
            f'Name: {serializer.data["name"]}\nDate: {date}\nTime:{date.time()}\nAge: {serializer.data["age"]}\nPhone Number: {serializer.data["phone_number"]}',
            'albara.m.hassan@gmail.com',
            ['braa3300@hotmail.com'],
            fail_silently=False,
        )

        return Response(serializer.data)

    except Exception as e:
        if "duplicate key value" in e.args[0]:
            return Response({"msg":"Phone number is used!"})

        return Response({"msg":e.args[0]})


@api_view(["PATCH"])
def admin_approve(req):  # PATCH for appointment approval
    date_id = req.query_params["id"]
    date = Appointment.objects.get(**{"id": date_id})
    serlializer = AppointmentSerializer(date)

    if serlializer.data["is_free"] is True:
        raise Exception("Cannot approve appointments that are free!")

    date = Appointment.objects.get(**{"id": date_id})
    date["is_approved"] = True
    date.save()
    serlializer = AppointmentSerializer(date)
    return Response(serlializer.data)