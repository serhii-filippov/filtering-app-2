import {ILoadAccountTokenService} from "@/domain/use-cases/load-account-token-service";
import {
    ILoadAccountTokenRepository,
    LOAD_ACCOUNT_TOKEN_REPOSITORY
} from "@/domain/models/gateways/load-account-token-repository";
import {DECRYPT_REPOSITORY, IDecrypt} from "@/domain/models/gateways/decryp-repositoryt";
import {Service, Adapter} from "@tsclean/core";

@Service()
export class LoadAccountTokenServiceImpl implements ILoadAccountTokenService {

    constructor(
        @Adapter(DECRYPT_REPOSITORY) private readonly decrypt: IDecrypt,
        @Adapter(LOAD_ACCOUNT_TOKEN_REPOSITORY) private readonly loadAccountTokenRepository: ILoadAccountTokenRepository
    ) {
    }

    async loadToken(token: string): Promise<ILoadAccountTokenService.Result> {
        let accessToken: string;

        try {
            accessToken = await this.decrypt.decrypt(token);
        } catch (e) {
            return null;
        }

        if (accessToken) {
            const account = await this.loadAccountTokenRepository.loadToken(accessToken["account"]);
            console.log("service", account)
            if (account) return account;
        }

        return null;
    }
}