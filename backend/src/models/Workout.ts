import mongoose, { Document, Schema } from "mongoose";

export interface IExercise extends Document {
    name: string;
    currentWeight: number | null;
    hasPassFail: boolean;
}

export interface IWorkout extends Document {
    userId: string;
    dayNumber: number;
    exercises: IExercise[];
}

const exerciseSchema: Schema = new Schema({
    name: { type: String, required: true },
    currentWeight: { type: Number, default: null },
    hasPassFail: { type: Boolean, default: true }
}, { _id: false });

const workoutSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    dayNumber: {
        type: Number,
        required: true,
        enum: [1, 2]
    },
    exercises: [exerciseSchema]
});

workoutSchema.index({ userId: 1, dayNumber: 1 }, { unique: true });

export default mongoose.model<IWorkout>('Workout', workoutSchema);