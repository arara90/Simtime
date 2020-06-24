# Generated by Django 3.0.4 on 2020-06-24 21:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20200624_2127'),
        ('invitations', '0005_remove_invitation_guest'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='is_shown',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='invitation',
            name='relationship',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='invitations', to='accounts.Relationship'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='invitation',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sendTo', to='invitations.Event'),
        ),
    ]
