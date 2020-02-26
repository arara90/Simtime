# Generated by Django 3.0.3 on 2020-02-26 03:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_name', models.CharField(max_length=200)),
                ('event_at', models.DateTimeField()),
                ('status', models.CharField(choices=[('CLOSED', 'Closed'), ('OPEN', 'Open'), ('PENDING', 'Pending')], default='OPEN', max_length=10)),
                ('message', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Event',
            },
        ),
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendance', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No'), ('Waiting for a response', 'Unknown')], default='Waiting for a response', max_length=25)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invitation', to='invitations.Event')),
                ('guest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invitation', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Invitation',
            },
        ),
    ]
