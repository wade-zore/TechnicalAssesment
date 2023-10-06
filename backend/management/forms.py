# from django import forms
# from django.forms import ModelForm, inlineformset_factory
# from api.models import Employee, Skill
#
#
#
#
# # SkillFormset = inlineformset_factory(Employee, Skill, formset=BaseSkillFormset, extra=1)
#
#
# class EmployeeForm(ModelForm):
#     class Meta:
#         model = Employee
#         exclude = ["id"]
#
#     first_name = forms.CharField(
#         label="First Name",
#         required=True,
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
#
#     last_name = forms.CharField(
#         label="Last Name",
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
#
#     contact_number = forms.CharField(
#         label="Contact Number",
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
#
#     email = forms.EmailField(
#         label="Email",
#         widget=forms.EmailInput(attrs={"class": "form-control"}),
#     )
#
#     date_of_birth = forms.DateField(
#         label="Date of Birth",
#         widget=forms.DateInput(attrs={"class": "form-control", "type": "date"}),
#     )
#
#     street_address = forms.CharField(
#         label="Street Address",
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
#
#     city = forms.CharField(
#         label="City",
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
#
#     postal_code = forms.CharField(
#         label="Postal Code",
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
#
#     country = forms.CharField(
#         label="Country",
#         widget=forms.TextInput(attrs={"class": "form-control"}),
#     )
