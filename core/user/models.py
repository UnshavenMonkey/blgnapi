from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from core.abstract.models import AbstractManager, AbstractModel

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class UserManager(BaseUserManager, AbstractManager):
        
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phonevnumber,
          username and password."""
        
        if username is None:
            raise TypeError('Users must have a username.')
        
        if email is None:
            raise TypeError('Users must have an email.')
        
        if password is None:
            raise TypeError('User must have an email.')
        
        user = self.model(username=username, email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password, **kwargs):
        """
        Create and return a `User` with superuser (admin)
        permissions.
        """

        if password is None:
            raise TypeError('Superusers must have a password.')
        
        if email is None:
            raise TypeError('Superusers must have an Creating a user model 29 email.')
        
        if username is None:
            raise TypeError('Superusers must have an username.')
        
        user = self.create_user(username, email, password, **kwargs)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to=user_directory_path, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
    

