# Generated by Django 3.2.8 on 2022-05-17 08:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=24, verbose_name='Команда атауы')),
                ('description', models.CharField(max_length=255, verbose_name='Команда сипаттамасы')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='Құрылған уақыт')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user', verbose_name='Құрушы')),
            ],
            options={
                'verbose_name': 'Команда',
                'verbose_name_plural': 'Командалар',
                'db_table': 'team',
            },
        ),
        migrations.CreateModel(
            name='TeamMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user', verbose_name='Мүше')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='team.team', verbose_name='Команда')),
            ],
            options={
                'verbose_name': 'Мүше',
                'verbose_name_plural': 'Мүшелер',
                'db_table': 'team_member',
            },
        ),
    ]