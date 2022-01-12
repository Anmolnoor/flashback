import {
	prop,
	getModelForClass,
	ModelOptions,
	Ref
} from "@typegoose/typegoose";
import { Auth } from "./Auth";

@ModelOptions({
	schemaOptions: {
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
})
class Comment {
	@prop({ required: true, ref: () => Auth })
	public userId!: Ref<Auth>;

	@prop({ required: true })
	public postId!: string;

	@prop({ required: true })
	public comment!: string;
}

export default getModelForClass(Comment);
export { Comment };
