# Generated by Django 3.2.8 on 2022-05-17 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='description',
            field=models.CharField(max_length=254, verbose_name='Команда сипаттамасы'),
        ),
        migrations.AlterField(
            model_name='team',
            name='name',
            field=models.CharField(max_length=40, verbose_name='Команда атауы'),
        ),
    ]
