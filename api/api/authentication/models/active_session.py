from django.db import models


class ActiveSession(models.Model):
    user = models.ForeignKey("app.User", on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.date}"