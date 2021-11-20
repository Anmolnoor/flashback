import { prop, ModelOptions, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Auth } from "./Auth";
class Tag {
	@prop({ required: true })
	public tag!: string;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
class Post {
	@prop({ required: true })
	public _id!: string;

	@prop({ required: true })
	public title!: string;

	@prop({ required: true })
	public content!: string;

	@prop({ required: true })
	public author!: string;

	@prop({ required: true, ref: () => Tag })
	public tags!: Ref<Tag>[];

	@prop({ required: true, ref: () => Auth })
	public likes!: Ref<Auth>[];

	@prop({ required: true })
	public selectedFile!: Date;
}

export default getModelForClass(Post);
