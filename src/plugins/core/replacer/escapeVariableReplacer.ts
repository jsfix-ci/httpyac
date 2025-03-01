import * as models from '../../../models';
import { isString } from '../../../utils';
import { HookTriggerContext } from 'hookpoint';

export const escapeVariableInterceptor = {
  afterLoop: async function escapeVariable(
    hookContext: HookTriggerContext<[unknown, string, models.ProcessorContext], unknown>
  ): Promise<boolean> {
    const [text] = hookContext.args;
    if (isString(text)) {
      const escapeRegex = /(?:\\\{){2}([^}{2}]+)(?:\\\}){2}/gu;
      let match: RegExpExecArray | null;
      let result = text;
      while (isString(result) && (match = escapeRegex.exec(text)) !== null) {
        const [searchValue, variable] = match;
        result = result.replace(searchValue, `{{${variable}}}`);
      }
      if (result !== text) {
        hookContext.results.push(result);
      }
    }
    return true;
  },
};
