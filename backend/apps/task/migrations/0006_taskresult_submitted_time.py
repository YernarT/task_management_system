# Generated by Django 3.2.8 on 2022-05-21 10:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0005_task_funds'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskresult',
            name='submitted_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Тапсыған уақыт'),
            preserve_default=False,
        ),
    ]