# Generated by Django 3.0.4 on 2021-01-10 10:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('invitations', '0024_auto_20210110_1913'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invitation',
            name='friend',
        ),
        migrations.AddField(
            model_name='invitation',
            name='host',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='invite', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='invitation',
            name='guest',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='invited', to=settings.AUTH_USER_MODEL),
        ),
    ]
