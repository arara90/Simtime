# Generated by Django 3.0.4 on 2020-12-18 07:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20200729_1804'),
        ('invitations', '0016_delete_invitation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendance', models.BooleanField(default=False)),
                ('show', models.BooleanField(default=True)),
                ('like', models.BooleanField(default=False)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sendTo', to='invitations.Event')),
                ('relationship', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invitations', to='accounts.Relationship')),
            ],
            options={
                'db_table': 'Invitation',
            },
        ),
    ]
