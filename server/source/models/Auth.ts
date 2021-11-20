import { prop, getModelForClass, ModelOptions } from "@typegoose/typegoose";
@ModelOptions({
	schemaOptions: {
		timestamps: true
	}
})
class Auth {
	@prop({ required: true })
	public email!: string;

	@prop({ required: true })
	public password!: string;

	@prop({ required: true })
	public name!: string;
}

export default getModelForClass(Auth);
export { Auth };
