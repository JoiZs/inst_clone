import GqlProvider from "../utils/urqlpr";
import AuthProvider from "./auth";
import FeaturenoneProvider from "./featurenone";
import PostCreateProvider from "./postcreate";
import ThemeProvider from "./theme";
import TokenProvider from "./token";

const ContextProviders = ({ children }: any) => {
  return (
    <TokenProvider>
      <GqlProvider>
        <AuthProvider>
          <PostCreateProvider>
            <FeaturenoneProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </FeaturenoneProvider>
          </PostCreateProvider>
        </AuthProvider>
      </GqlProvider>
    </TokenProvider>
  );
};

export default ContextProviders;
