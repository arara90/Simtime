# Generated by Django 3.0.4 on 2020-12-18 08:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invitations', '0019_invitation'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Invitation',
        ),
    ]