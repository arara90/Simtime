# Generated by Django 3.0.2 on 2020-02-06 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invitations', '0002_auto_20200206_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invitation',
            name='host',
            field=models.CharField(max_length=50),
        ),
    ]
