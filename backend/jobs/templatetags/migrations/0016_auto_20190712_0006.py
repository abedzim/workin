# Generated by Django 2.0 on 2019-07-12 00:06

from django.db import migrations
import places.fields


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0015_auto_20190711_2258'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='country',
        ),
        migrations.AddField(
            model_name='post',
            name='location',
            field=places.fields.PlacesField(blank=True, max_length=255),
        ),
    ]