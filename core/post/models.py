from django.db import models
from core.abstract.models import AbstractModel, AbstractManager

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class PostManager(AbstractManager):
    pass
class Post(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    objects = PostManager()
    post_image = models.ImageField(upload_to=user_directory_path, null=True)

    def __str__(self):
        return f"{self.author.name}"
    

# Create your models here.
