import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
    IUIKitErrorInteractionParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUIKitInteractionHandler } from "@rocket.chat/apps-engine/definition/uikit";
import { AppDialogApp } from "../AppDialogApp";
import { SimpleModal } from "../modals/SimpleModal";

export class OpenDialogCommand implements ISlashCommand {
    public command: string = "dialog";
    public i18nParamsExample: string = "params";
    public i18nDescription: string = "will open dialog";
    public providesPreview: boolean = false;

    private context: SlashCommandContext;
    private read: IRead;
    private modify: IModify;
    constructor(private readonly app: AppDialogApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistance: IPersistence
    ): Promise<void> {
        const triggerId = context.getTriggerId();
        if (triggerId) {
            this.context = context;
            this.read = read;
            this.modify = modify;

            
            const room = context.getRoom();
            const send = await modify
                .getCreator()
                .startMessage()
                .setText("hello click")
                .setRoom(room);
            await modify.getCreator().finish(send);


            // const modal =await SimpleModal({read,modify,persistance,slashCommandContext:context});
            // await modify.getUiController().openModalView(modal,{triggerId},context.getSender());

            const task = {
                id: "timer",
                interval: "10 second",
                data: { modify:this.modify,context:this.context},
            };
            await modify.getScheduler().scheduleRecurring(task);
        }
    }
}
