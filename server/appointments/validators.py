import datetime
import phonenumbers
from .codes import data


def validate_age(age):
    
    if age < 0:
        raise Exception("Age is not acceptable!")


def validate_phone(phone_number):
    if len(phone_number) < 9:
        raise Exception("Phone number is not valid!")
    countries = list(data.keys())
    is_valid = []
    for i in countries:
        try:
            number = phonenumbers.parse(phone_number, i)
            is_valid.append(phonenumbers.is_valid_number(number))
        except:
            pass
    if not any(is_valid):
        raise Exception("Phone number is not valid!")



def validate_date(year, month, day, hour, minute):
    if datetime.datetime(year,month,day,hour,minute) < datetime.datetime.now():
        raise Exception("Date is not allowed!")
