import React, { memo } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";

import manager from "@ledgerhq/live-common/lib/manager";
import { Icons, Tag, Text } from "@ledgerhq/react-ui";
import FlexBox from "@ledgerhq/react-ui/components/layout/Flex";

import { DeviceInfo, FirmwareUpdateContext } from "@ledgerhq/live-common/lib/types/manager";
import { AppsDistribution } from "@ledgerhq/live-common/lib/apps";
import { DeviceModel } from "@ledgerhq/devices";
import { ThemedComponent } from "~/renderer/styles/StyleProvider";

import ByteSize from "~/renderer/components/ByteSize";
import Tooltip from "~/renderer/components/Tooltip";
import Box from "~/renderer/components/Box";
import DeviceIllustration from "~/renderer/components/DeviceIllustration";
import StorageBar from "./StorageBar";

type Props = {
  deviceModel: DeviceModel;
  deviceInfo: DeviceInfo;
  distribution: AppsDistribution;
  isIncomplete: boolean;
  installQueue: string[];
  uninstallQueue: string[];
  jobInProgress: boolean;
  firmware?: FirmwareUpdateContext;
};

const InfoParticle = ({ label, value }: { label: string; value: string }) => {
  return (
    <Text ff="Inter|Medium" color="palette.neutral.c80" type="navigation" fontSize="12px" mr="24px">
      {label}
      <Text color="palette.neutral.c100"> {value}</Text>
    </Text>
  );
};

const DeviceStorage = ({
  deviceModel,
  deviceInfo,
  distribution,
  isIncomplete,
  installQueue,
  uninstallQueue,
  jobInProgress,
  firmware,
}: Props) => {
  const { t } = useTranslation();

  // TODO: get update regarding this state in the new design
  // const shouldWarn = distribution.shouldWarnMemory || isIncomplete;

  const firmwareOutdated = manager.firmwareUnsupported(deviceModel.id, deviceInfo) || firmware;

  return (
    <FlexBox horizontal alignItems="center">
      <DeviceIllustration height={132} width={120} deviceId={deviceModel?.id} />
      <FlexBox p="16px 0px 16px 16px" flexDirection="column" flex={1}>
        <FlexBox horizontal mb="8px" alignItems="center">
          <Text type="h3" uppercase color="palette.neutral.c100" fontSize="28px">
            {deviceModel.productName}
          </Text>
          <Box ml={2}>
            <Tooltip content={<Trans i18nKey="manager.deviceStorage.genuine" />}>
              <Icons.CircledCheckRegular color="palette.success.c100" ml="6px" size={24} />
            </Tooltip>
          </Box>
        </FlexBox>
        <FlexBox horizontal mb="18px" alignItems="center">
          <Tag active type="opacity" mr="8px">
            v{deviceInfo.version}
          </Tag>
          <Text ff="Inter|Medium" color="palette.neutral.c80" type="small">
            {firmwareOutdated ? (
              <Trans
                i18nKey="v3.manager.deviceStorage.firmwareAvailable"
                values={{ version: deviceInfo.version }}
              />
            ) : (
              <Trans
                i18nKey="v3.manager.deviceStorage.firmwareUpToDate"
                values={{ version: deviceInfo.version }}
              />
            )}
          </Text>
        </FlexBox>
        <StorageBar
          distribution={distribution}
          deviceInfo={deviceInfo}
          deviceModel={deviceModel}
          isIncomplete={isIncomplete}
          installQueue={installQueue}
          uninstallQueue={uninstallQueue}
          jobInProgress={jobInProgress}
        />
        <FlexBox horizontal mt="12px" justifyContent="space-between" alignItems="center">
          <FlexBox horizontal>
            <InfoParticle
              label={t("manager.deviceStorage.used")}
              value={
                <ByteSize
                  deviceModel={deviceModel}
                  value={distribution.totalAppsBytes}
                  firmwareVersion={deviceInfo.version}
                />
              }
            />
            <InfoParticle
              label={t("manager.deviceStorage.capacity")}
              value={
                <ByteSize
                  deviceModel={deviceModel}
                  value={distribution.appsSpaceBytes}
                  firmwareVersion={deviceInfo.version}
                />
              }
            />
            <InfoParticle
              label={t("manager.deviceStorage.installed")}
              value={!isIncomplete ? distribution.apps.length : "—"}
            />
          </FlexBox>
          <FlexBox horizontal alignItems="center">
            <Text uppercase variant="subtitle" ff="Inter|SemiBold" color="palette.light.neutral.c80" fontSize={3}>
              {isIncomplete ? (
                <Trans i18nKey="manager.deviceStorage.incomplete" />
              ) : distribution.freeSpaceBytes > 0 ? (
                <>
                  <Trans i18nKey="manager.deviceStorage.freeSpace" values={{ space: 0 }}>
                    <ByteSize
                      value={distribution.freeSpaceBytes}
                      deviceModel={deviceModel}
                      firmwareVersion={deviceInfo.version}
                    />
                    {"free"}
                  </Trans>
                </>
              ) : (
                <Trans i18nKey="manager.deviceStorage.noFreeSpace" />
              )}
            </Text>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default memo<Props>(DeviceStorage);