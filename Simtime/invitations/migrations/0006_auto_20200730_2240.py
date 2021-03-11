# Generated by Django 3.0.4 on 2020-07-30 13:40

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invitations', '0005_auto_20200730_2240'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='event_place',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='event',
            name='tags',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
    ]
