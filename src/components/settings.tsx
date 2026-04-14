import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Switch, Divider, Stack, Text } from '@heroui/react';
import { Sun, Moon, VolumeHigh, VolumeOff, TrendingUp, CheckCircle } from 'lucide-react';
import { loadSettings, saveSettings } from '../utils';
import { Settings } from '../types';
import { GameState, loadGameState } from '../types';

interface SettingsPanelProps {
  gameState?: GameState;
}

export default function SettingsPanel({ gameState }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [stats, setStats] = useState<GameState | null>(null);

  // Load game state for stats if not provided as prop
  useEffect(() => {
    if (!gameState) {
      setStats(loadGameState());
    } else {
      setStats(gameState);
    }
  }, [gameState]);

  // Save settings and apply theme when they change
  useEffect(() => {
    saveSettings(settings);
    const theme = settings.darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [settings]);

  const toggleSound = () => setSettings((s) => ({ ...s, sound: !s.sound }));
  const toggleDark = () => setSettings((s) => ({ ...s, darkMode: !s.darkMode }));

  return (
    <div className="p-4 sm:p-8 max-w-xl mx-auto">
      <Card className="bg-surface/50 border-default-200/50">
        <CardHeader className="text-2xl font-bold flex items-center gap-3">
          <Settings className="h-5 w-5 text-primary" />
          <span>Settings</span>
        </CardHeader>
        <Divider />
        <CardBody className="space-y-6">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.sound ? (
                <VolumeHigh className="h-5 w-5 text-primary" />
              ) : (
                <VolumeOff className="h-5 w-5 text-muted" />
              )}
              <span>Sound Effects</span>
            </div>
            <Switch
              isSelected={settings.sound}
              onValueChange={toggleSound}
              color="primary"
            />
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <Moon className="h-5 w-5 text-accent" />
              ) : (
                <Sun className="h-5 w-5 text-accent" />
              )}
              <span>Dark Mode</span>
            </div>
            <Switch
              isSelected={settings.darkMode}
              onValueChange={toggleDark}
              color="secondary"
            />
          </div>

          {/* Divider */}
          <Divider className="my-6" />

          {/* Stats Section */}
          <Stack className="space-y-4">
            <Text className="font-semibold text-lg">Session Statistics</Text>
            {stats ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="text-center p-4 bg-surface/30 rounded-lg border border-default-200/30">
                    <TrendingUp className="h-6 w-6 text-primary mb-2" />
                    <div className="text-2xl font-bold">{stats.cookies.toLocaleString()}</div>
                    <Text className="text-sm text-muted">Cookies Earned</Text>
                  </div>
                  <div className="text-center p-4 bg-surface/30 rounded-lg border border-default-200/30">
                    <CheckCircle className="h-6 w-6 text-accent mb-2" />
                    <div className="text-2xl font-bold">{stats.prestigeCount}</div>
                    <Text className="text-sm text-muted">Prestige Levels</Text>
                  </div>
                  <div className="text-center p-4 bg-surface/30 rounded-lg border border-default-200/30">
                    <TrendingUp className="h-6 w-6 text-secondary mb-2" />
                    <div className="text-2xl font-bold">
                      {((stats.upgrades.reduce((sum, u) => sum + u.cps * u.owned, 0)) || 0).toFixed(1)}
                    </div>
                    <Text className="text-sm text-muted">Cookies per Second</Text>
                  </div>
                  <div className="text-center p-4 bg-surface/30 rounded-lg border border-default-200/30">
                    <Settings className="h-6 w-6 text-muted mb-2" />
                    <div className="text-2xl font-bold">
                      {Object.keys(stats.upgrades).length}
                    </div>
                    <Text className="text-sm text-muted">Upgrade Types</Text>
                  </div>
                </div>
                <div className="text-center text-xs text-muted mt-4">
                  Stats reflect current session. Data stored in session storage.
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="h-8 w-8 text-muted">⏳</div>
                <p className="mt-2 text-sm">Loading stats...</p>
              </div>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Text className="text-xs text-muted">
            Settings saved to session storage • Theme applies immediately
          </Text>
        </CardFooter>
      </Card>
    </div>
  );
}
</code>
