# Generated by Django 5.1.2 on 2024-11-02 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='person',
            old_name='organizer_email',
            new_name='email',
        ),
        migrations.RemoveField(
            model_name='person',
            name='image',
        ),
    ]
