# Generated by Django 3.0.4 on 2020-06-24 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invitations', '0003_auto_20200622_1613'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='event_at',
            new_name='event_time',
        ),
    ]