# Generated by Django 3.0.4 on 2020-12-31 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20201230_1222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendship',
            name='status',
            field=models.IntegerField(choices=[(0, 'Mutual'), (1, 'A Only'), (2, 'B Only'), (3, 'A Request'), (4, 'B Request'), (5, 'Account'), (999, 'Unknown')], max_length=10),
        ),
    ]
