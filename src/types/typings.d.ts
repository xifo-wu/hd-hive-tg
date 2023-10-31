interface TGWebAppChat {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title: string;
  username?: string;
  photo_url?: string;
}

interface TGWebAppUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: string;
  photo_url?: string;
}

interface TGWebAppInitData {
  query_id?: string;
  user?: TGWebAppUser;
  chat?: TGWebAppChat;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

interface TGThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
}

interface TGPopupParams {
  title?: string;
  message: string;
  buttons?: Array<TGPopupButton>;
}

interface TGPopupButton {
  id: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text?: string;
}

interface Window {
  Telegram: {
    WebApp: {
      initData: string;
      initDataUnsafe: TGWebAppInitData;
      version: string;
      platform: string;
      colorScheme: 'light' | 'dark';
      themeParams: TGThemeParams;
      viewportHeight: number;
      showPopup: (params: TGPopupParams, callback?: any) => void;
      onEvent: (eventType: string, eventHandler: any) => void;
      offEvent: (eventType: string, eventHandler: any) => void;
      setBackgroundColor: (color: string) => void;
      setHeaderColor: (color: string) => void;
      enableClosingConfirmation: () => void;
      openLink: (url: string, options?: { try_instant_view: boolean }) => void;
      openTelegramLink: (url: string) => void;
      expand: () => void;
      close: () => void;
      BackButton: {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
      };
    };
  };
}
