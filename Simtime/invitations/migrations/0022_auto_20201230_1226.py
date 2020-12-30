# Generated by Django 3.0.4 on 2020-12-30 03:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('invitations', '0021_auto_20201218_1727'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='guest',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='invitations', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='invitation',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invitations', to='invitations.Event'),
        ),
    ]