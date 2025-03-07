import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            minLength: [3, 'Username must be at least 3 characters long.'],
            maxLength: [30, 'Username cannot exceed 30 characters.'],
            match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and dashes.']
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                'Must match a valid email address!',
            ],
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: [8, 'Password must be at least 8 characters long.'],
            maxLength: [50, 'Password cannot exceed 50 characters.'],
            validate: {
                validator: function(v) {
                  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
                },
                message: 'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.',
            }
        },
        folders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Folder'
            }
        ],
        notes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Note'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                const formattedDate = timestamp.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  });
                  return formattedDate.replace(/(\d{2}),/, '$1.');
            }
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        toObject: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

userSchema
    .virtual('fullName')
    .get(function() {
        return `${this.firstName} ${this.lastName}`;
    })
    .set(function(v) {
        const nameParts = v.split(' ');
        this.firstName = nameParts[0];
        this.lastName = nameParts.slice(1).join(' ');
    });

userSchema
    .virtual('initials')
    .get(function() {
        const initials = this.firstName[0].toUpperCase() + this.lastName[0].toUpperCase();
        return initials;
    });

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;