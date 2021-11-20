import { prop, ModelOptions, getModelForClass, Ref } from "@typegoose/typegoose";
import { Auth } from "./Auth";
// class Tag {
// 	@prop({ required: true })
// 	public tag!: string;
// }

@ModelOptions({ schemaOptions: { timestamps: true } })
class Post {
	@prop({ required: true })
	public title!: string;

	@prop({ required: true })
	public message!: string;

	@prop({ required: true })
	public creator!: string;

	// @prop({ required: true, ref: () => Tag })
	// public tags!: Ref<Tag>[];
	@prop({ required: true, default: [] })
	public tags!: string[];

	@prop({ required: true, ref: () => Auth })
	public likes!: Ref<Auth>[];

	@prop({ required: true })
	public selectedFile!: string;
}

export default getModelForClass(Post);
