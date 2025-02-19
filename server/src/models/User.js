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
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8
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